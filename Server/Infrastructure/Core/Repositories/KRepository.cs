using Domain.Core.Entities;
using Domain.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Core.Repositories;

public class KRepository<TEntity> : IKRepository<TEntity>
    where TEntity : class, IKEntity
{   
    private readonly DbContext _context;

    protected KRepository(IServiceProvider serviceProvider)
    {
        _context = serviceProvider.GetRequiredService<DbContext>();
    }

    public IQueryable<TEntity> GetQueryable()   
    {
        return _context.Set<TEntity>().AsQueryable();
    }

    public async Task CreateAsync(TEntity entity, bool save = true)
    {
        await _context.Set<TEntity>().AddAsync(entity);
        
        if (!save) return;
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TEntity entity, bool save = true)
    {
        _context.Set<TEntity>().Update(entity);
        
        if (!save) return;
        await _context.SaveChangesAsync();
    }

    public virtual async Task DeleteAsync(TEntity entity, bool save = true)
    {
        _context.Set<TEntity>().Remove(entity);

        if (!save) return;

        await _context.SaveChangesAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}