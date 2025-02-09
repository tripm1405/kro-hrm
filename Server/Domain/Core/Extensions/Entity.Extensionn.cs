using Domain.Core.Entities;

namespace Domain.Core.Extensions;

public static class EntityExtension
{
    public static TItem Clone<TItem>(this IKEntity entity)
        where TItem : class, new()
    {
        return new TItem();
    }
}