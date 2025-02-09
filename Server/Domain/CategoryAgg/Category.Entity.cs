using Domain.Core.Entities;

namespace Domain.CategoryAgg;

public class CategoryEntity : IKCategoryEntity, IKIndexKEntity
{
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public Guid? RootId { get; set; }
    public bool IsDefault { get; set; }
    public int Index { get; set; }

    #region Ref

    public CategoryEntity Root { get; set; }
    public List<CategoryEntity> Children { get; set; }

    #endregion
}