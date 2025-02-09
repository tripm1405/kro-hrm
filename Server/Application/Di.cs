using System.Reflection;
using Application.Core.Services;
using Domain.Core.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class Di
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IIdentityService, IdentityService>();
        
        services.AddMediatR(cfg => {
            cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
        });

        return services;
    }
}