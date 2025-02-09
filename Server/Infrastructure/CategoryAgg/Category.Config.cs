using Domain.CategoryAgg;
using Infrastructure.Core.Attributes;
using Infrastructure.Core.Configs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.CategoryAgg;

[Table("Category")]
public class CategoryConfig : KConfig<CategoryEntity>
{
    public override void Configure(EntityTypeBuilder<CategoryEntity> builder)
    {
        base.Configure(builder);
        
        builder.Property(x => x.RootId).IsRequired(false);

        builder.HasOne(x => x.Root)
            .WithMany(x => x.Children)
            .HasForeignKey(x => x.RootId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}