namespace Domain.Core.Entities;

public interface IKAuditEntity : IKEntity
{
    DateTime CreatedAt { get; set; }
    Guid CreatedBy { get; set; }
    DateTime UpdatedAt { get; set; }
    Guid UpdatedBy { get; set; }
}