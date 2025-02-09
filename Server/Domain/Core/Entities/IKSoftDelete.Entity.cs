namespace Domain.Core.Entities;

public interface IKSoftDeleteEntity
{
    bool IsDeleted { get; set; }
    DateTime DeletedAt { get; set; }
    Guid DeletedBy { get; set; }
}