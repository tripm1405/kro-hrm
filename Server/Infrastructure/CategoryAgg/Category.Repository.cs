using Domain.CategoryAgg;
using Infrastructure.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.CategoryAgg;

public class CategoryRepository : KRepository<CategoryEntity>, ICategoryRepository
{
    public CategoryRepository(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public override async Task DeleteAsync(CategoryEntity category, bool save = true)
    {
        var queryable = GetQueryable().AsNoTracking();
        var children = await queryable
            .Where(e => e.RootId == category.Id)
            .ToListAsync();

        foreach (var child in children)
        {
            await DeleteAsync(child);
        }
        
        await base.DeleteAsync(category);
    }
}