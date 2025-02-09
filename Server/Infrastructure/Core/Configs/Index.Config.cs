using Domain.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Core.Configs;

public class IndexConfig<TEntity> : IEntityTypeConfiguration<TEntity>
    where TEntity : class, IKIndexKEntity
{
    public virtual void Configure(EntityTypeBuilder<TEntity> builder)
    {
        builder.Property(x => x.Index)
            .ValueGeneratedOnAdd();
    }
}