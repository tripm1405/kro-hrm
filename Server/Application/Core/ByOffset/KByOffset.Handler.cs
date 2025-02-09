using System.Linq.Expressions;
using Application.Core.ByOffset.Extensions;
using Application.Core.ByOffset.Requests;
using Application.Core.ByOffset.Responses;
using Application.Core.Handlers;
using Application.Core.Responses;
using Domain.Core.Entities;
using Domain.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Application.Core.ByOffset;

public class
    KOffsetKHandler<TRequest, TResponse, TItem, TEntity, TFilter, TOrderBy> : KHandler<TRequest, TResponse, TEntity>
    where TRequest : class, IKByByOffsetRequest<TResponse, TItem, TFilter, TOrderBy>
    where TResponse : class, IKOffsetResponse<TItem>, new()
    where TItem : class, new()
    where TEntity : class, IKEntity
    where TOrderBy : IKOffsetOrderBy
    where TFilter : IKByOffsetFilter
{
    protected KOffsetKHandler(IKRepository<TEntity> repo) : base(repo)
    {
    }

    public override async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken)
    {
        var queryable = Repo.GetQueryable().AsNoTracking();

        var total = await queryable.CountAsync(cancellationToken: cancellationToken);

        var dtos = await queryable
            .Apply_ByOffset(request)
            .Select(Select)
            .ToListAsync(cancellationToken: cancellationToken);

        return new TResponse
        {
            Items = dtos,
            Size = request.Size,
            Page = request.Page,
            Total = total,
        };
    }

    protected virtual Expression<Func<TEntity, TItem>> Select => e => new TItem();
}

public class KOffsetKHandler<TRequest, TResponse, TItem, TEntity> : KOffsetKHandler<TRequest, TResponse, TItem, TEntity,
    KByOffsetFilter, KByOffsetOrderBy>
    where TRequest : class, IKByByOffsetRequest<TResponse, TItem>
    where TResponse : class, IKOffsetResponse<TItem>, new()
    where TItem : class, new()
    where TEntity : class, IKEntity
{
    protected KOffsetKHandler(IKRepository<TEntity> repo) : base(repo)
    {
    }
}