using Application.Core.ByOffset.Enums;
using Application.Core.Common.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Application.Core.ByOffset.Extensions;

public static class KByOffsetExtension
{
    public static IQueryable<TEntity> Apply_ByOffset<TEntity, TFilter, TOrderBy>(this IQueryable<TEntity> query,
        IKByOffsetQuery<TFilter, TOrderBy> offset)
        where TFilter : IKByOffsetFilter
        where TOrderBy : IKOffsetOrderBy
    {
        query = query.Apply_ByOffset_Filter(offset.Filters).Apply_ByOffset_Sort(offset.Sort);

        if (!offset.Size.HasValue) return query;

        if (offset.Page.HasValue) query = query.Skip((offset.Page.Value - 1) * offset.Size.Value);

        return query.Take(offset.Size.Value);
    }

    private static IQueryable<TEntity> Apply_ByOffset_Filter<TEntity, TFilter>(this IQueryable<TEntity> query,
        List<TFilter> listFilter)
        where TFilter : IKByOffsetFilter
    {
        foreach (var filter in listFilter)
        {
            var propertyName = filter.Property.CapitalizeFirstLetter();

            switch (filter.Type)
            {
                case KByOffsetFilterType.In_Str_AllWithOrder:
                {
                    var pattern = string.Join("%", filter.Data);
                    // var pattern = string.Join("%", ((IKByOffsetFilterStrContain)filter.Data).ListStr);
                    query = query.Where(e => EF.Property<string>(e!, propertyName).Contains(pattern));
                    break;
                }
                case KByOffsetFilterType.Out_Str_Any:
                {
                    break;
                }
                default: break;
            }
        }

        return query;
    }

    private static IQueryable<TEntity> Apply_ByOffset_Sort<TEntity, TOrderBy>(this IQueryable<TEntity> query,
        List<TOrderBy> sort)
        where TOrderBy : IKOffsetOrderBy
    {
        return sort.Aggregate(query, (current, orderBy) =>
        {
            var propertyName = orderBy.Property.CapitalizeFirstLetter();
            return orderBy.Type == KByOffsetOrderByType.Ascending
                ? current.OrderBy(e => EF.Property<object>(e!, propertyName))
                : current.OrderByDescending(e => EF.Property<object>(e!, propertyName));
        });
    }
}