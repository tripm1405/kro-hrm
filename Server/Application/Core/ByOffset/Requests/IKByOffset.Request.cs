using Application.Core.ByOffset.Responses;
using MediatR;

namespace Application.Core.ByOffset.Requests;

public interface IKByByOffsetRequest<out TResponse, TItem, TFilter, TOrderBy> : IRequest<TResponse>,
    IKByOffsetQuery<TFilter, TOrderBy>
    where TResponse : IKOffsetResponse<TItem>
    where TFilter : IKByOffsetFilter
    where TOrderBy : IKOffsetOrderBy
{
}

public interface
    IKByByOffsetRequest<out TResponse, TItem> : IKByByOffsetRequest<TResponse, TItem, KByOffsetFilter, KByOffsetOrderBy>
    where TResponse : IKOffsetResponse<TItem>
{
}