namespace Domain.Core.Exceptions;

public class EntityNotFoundException : Exception
{
    public EntityNotFoundException() : base($"Entity not found")
    {
    }
    
    public EntityNotFoundException(Type type) : base($"{type} not found")
    {
    }
    
    public EntityNotFoundException(string message) : base(message)
    {
    }
}