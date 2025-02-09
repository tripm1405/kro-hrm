using Domain.Core.Entities;

namespace Domain.Core.Repositories;

public interface IKRepository<TEntity>
    where TEntity : class, IKEntity
{
    IQueryable<TEntity> GetQueryable();
    Task CreateAsync(TEntity entity, bool save = true);
    Task UpdateAsync(TEntity entity, bool save = true);
    Task DeleteAsync(TEntity entity, bool save = true);

    Task SaveChangesAsync();
}