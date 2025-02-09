using System.Reflection;
using System.Reflection.Metadata;
using Domain.Core.Entities;
using Infrastructure.Core.Attributes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Core.Configs;

public class KConfig<TEntity> : IEntityTypeConfiguration<TEntity>
    where TEntity : class, IKEntity
{
    public virtual void Configure(EntityTypeBuilder<TEntity> builder)
    {
        var classAttribute = (TableAttribute) Attribute.GetCustomAttribute(GetType(), typeof(TableAttribute));
        if (classAttribute == null)
        {
            throw new NullReferenceException("TableAttribute is null");
        }
        builder.ToTable(classAttribute?.Name);
        
        CoreConfigure(builder);
    }

    private static void CoreConfigure(EntityTypeBuilder<TEntity> builder)
    {
        var type = typeof(TEntity);
        if (typeof(IKIdEntity).IsAssignableFrom(type))
        {
            builder.HasKey(x => ((IKIdEntity)x).Id);
        }
        if (typeof(IKIndexKEntity).IsAssignableFrom(type))
        {
            builder.Property(x => ((IKIndexKEntity)x).Index)
                .IsRequired()
                .ValueGeneratedOnAdd()
                .Metadata
                .SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
        }
        if (typeof(IKAuditEntity).IsAssignableFrom(type))
        {
            builder.Property(x => ((IKAuditEntity)x).CreatedAt)
                .IsRequired()
                .HasDefaultValue(DateTime.Now);
            builder.Property(x => ((IKAuditEntity)x).UpdatedAt)
                .IsRequired()
                .HasDefaultValue(DateTime.Now);
        }
        if (typeof(IKSoftDeleteEntity).IsAssignableFrom(type))
        {
            builder.Property(x => ((IKSoftDeleteEntity)x).IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);
        }
        if (typeof(IKCategoryEntity).IsAssignableFrom(type))
        {
            builder.Property(x => ((IKCategoryEntity)x).Code)
                .IsRequired()
                .HasMaxLength(32);
            builder.Property(x => ((IKCategoryEntity)x).Name)
                .IsRequired()
                .HasMaxLength(64);
            builder.Property(x => ((IKCategoryEntity)x).IsDefault)
                .IsRequired()
                .HasDefaultValue(false);
        }
    }
}