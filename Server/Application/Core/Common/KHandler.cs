using Domain.Core.Entities;
using Domain.Core.Repositories;
using MediatR;

namespace Application.Core.Handlers;

public abstract class KHandler<TRequest, TResponse, TEntity> : IRequestHandler<TRequest, TResponse>
    where TRequest : class, IRequest<TResponse>
    where TResponse : new()
    where TEntity : class, IKEntity
{
    protected readonly IKRepository<TEntity> Repo;

    protected KHandler(IKRepository<TEntity> repo)
    {
        Repo = repo;
    }
    
    public virtual async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken)
    {
        return new TResponse();
    }
}