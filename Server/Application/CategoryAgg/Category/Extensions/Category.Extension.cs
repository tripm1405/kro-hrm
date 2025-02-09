using Application.CategoryAgg.Category.Dtos;
using Domain.CategoryAgg;

namespace Application.CategoryAgg.Category.Extensions;

public static class CategoryExtension
{
    public static CategoryDto GenDto(this CategoryEntity entity)
    {
        return new CategoryDto
        {
            Id = entity.Id,
            Code = entity.Code,
            Name = entity.Name,
            Description = entity.Description,
            RootId = entity.RootId,
            IsDefault = entity.IsDefault,
            Index = entity.Index,
        };
    }
}