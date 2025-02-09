using Domain.Core.Services;
using Microsoft.AspNetCore.Identity;

namespace Application.Core.Services;

public class IdentityService: IIdentityService
{
    private readonly PasswordHasher<object?> _passwordHasher;

    public IdentityService()
    {
        _passwordHasher = new PasswordHasher<object?>();
    }
    
    public string HashPassword(string password)
    {
        return _passwordHasher.HashPassword(new object(), password);
    }
}