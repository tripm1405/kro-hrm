using Domain.LanguageAgg;
using Infrastructure.Core.Attributes;
using Infrastructure.Core.Configs;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.LanguageAgg;

[Table("Translate")]
public class TranslateConfig : KConfig<TranslateEntity>
{
    public override void Configure(EntityTypeBuilder<TranslateEntity> builder)
    {
        base.Configure(builder);
        
        builder.Property(e => e.Code)
            .IsRequired()
            .HasMaxLength(128);
    }
}