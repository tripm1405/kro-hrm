using Application.Core.ByOffset;
using Application.Core.ByOffset.Responses;
using Application.Core.Responses;
using Web.Core.Common.Responses;

namespace Web.Core.Common.Extensions;

public static class QueryExtension
{
    public static TRequest GenOffsetRequest<TRequest, TFilter, TOrderBy>(
        this IKByOffsetQuery<TFilter, TOrderBy> query)
        where TRequest : IKByOffsetQuery<TFilter, TOrderBy>, new()
        where TFilter : IKByOffsetFilter
        where TOrderBy : IKOffsetOrderBy
    {
        return new TRequest
        {
            Size = query.Size,
            Page = query.Page,
            Sort = query.Sort,
            Filters = query.Filters,
        };
    }

    public static ApiRes<TResponse> GenOffsetResponse<TResponse>(this TResponse response)
        where TResponse : IKOffsetResponse, new()
    {
        return new ApiRes<TResponse>
        {
            Result = response,
        };
    }
}