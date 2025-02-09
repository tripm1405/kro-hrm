namespace Domain.Core.Services;

public interface IIdentityService
{
    string HashPassword(string password);
}