namespace Application.Core.ByOffset;

public interface IKByOffsetQuery<TFilter, TOrderBy>
    where TFilter : IKByOffsetFilter
    where TOrderBy : IKOffsetOrderBy
{
    int? Size { get; set; }
    int? Page { get; set; }
    List<TFilter>? Filters { get; set; }
    List<TOrderBy>? Sort { get; set; }
}

public interface IKByOffsetQuery : IKByOffsetQuery<KByOffsetFilter, KByOffsetOrderBy>
{
}