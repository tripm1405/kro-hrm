using Application.Core.ByOffset;

namespace Web.Core.GetByOffset;

public interface IKByGetByOffsetQuery<TFilter, TOrderBy> : IKByOffsetQuery<TFilter, TOrderBy>
    where TFilter : IKByOffsetFilter
    where TOrderBy : IKOffsetOrderBy
{
}