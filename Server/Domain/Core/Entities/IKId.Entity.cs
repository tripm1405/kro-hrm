namespace Domain.Core.Entities;

public interface IKIdEntity : IKEntity
{
    Guid Id { get; set; }
}