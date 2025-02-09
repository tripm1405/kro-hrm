using Domain.LanguageAgg;
using Infrastructure.Core.Attributes;
using Infrastructure.Core.Configs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.LanguageAgg;

[Table("Sentence")]
public class SentenceConfig : KConfig<SentenceEntity>
{
    public override void Configure(EntityTypeBuilder<SentenceEntity> builder)
    {
        base.Configure(builder);

        builder.HasIndex(e => new { e.RootId, e.TypeId })
            .IsUnique();
        
        builder.Property(e => e.Content)
            .IsRequired()
            .HasMaxLength(512);
        
        builder.HasOne(x => x.Root)
            .WithMany(x => x.Sentences)
            .HasForeignKey(x => x.RootId)
            .OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(x => x.Type)
            .WithMany()
            .HasForeignKey(x => x.TypeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}