namespace Domain.Core.Entities;

public interface IKCategoryEntity : IKIdEntity
{
    string Code { get; set; }
    string Name { get; set; }
    string Description { get; set; }
    bool IsDefault { get; set; }
}