using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var configuredWebDist = builder.Configuration["WEB_DIST_PATH"];
var webDistPath = Path.GetFullPath(configuredWebDist ?? Path.Combine(
    app.Environment.ContentRootPath,
    "..",
    "web",
    "dist"));
var indexFilePath = Path.Combine(webDistPath, "index.html");
var hasFrontendBuild = Directory.Exists(webDistPath) && File.Exists(indexFilePath);

if (hasFrontendBuild)
{
    var fileProvider = new PhysicalFileProvider(webDistPath);
    app.UseDefaultFiles(new DefaultFilesOptions { FileProvider = fileProvider });
    app.UseStaticFiles(new StaticFileOptions { FileProvider = fileProvider });
}

app.MapGet("/api/health", () => Results.Ok(new
{
    status = "ok",
    service = "TechVideoGenerator.Api",
}));

app.MapFallback(async context =>
{
    if (context.Request.Path.StartsWithSegments("/api"))
    {
        context.Response.StatusCode = StatusCodes.Status404NotFound;
        return;
    }

    if (!hasFrontendBuild)
    {
        context.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
        context.Response.ContentType = "text/plain; charset=utf-8";
        await context.Response.WriteAsync("Frontend build not found. Run 'npm run build:web' first.");
        return;
    }

    context.Response.ContentType = "text/html; charset=utf-8";
    await context.Response.SendFileAsync(indexFilePath);
});

app.Run();

public partial class Program;
