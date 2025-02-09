using Domain.CategoryAgg;
using Domain.LanguageAgg;
using Infrastructure.CategoryAgg;
using Infrastructure.LanguageAgg;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class Di
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddScoped<DbContext>(provider => provider.GetRequiredService<AppContext>());

        #region Repositories

        services.AddScoped<ITranslateRepo, TranslateRepo>();
        services.AddScoped<ISentenceRepo, SentenceRepo>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();

        #endregion
        
        return services;
    }
}