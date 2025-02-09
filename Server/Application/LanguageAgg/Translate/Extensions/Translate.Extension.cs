using Application.LanguageAgg.Sentence.Extensions;
using Application.LanguageAgg.Translate.DTOs;
using Domain.LanguageAgg;

namespace Application.LanguageAgg.Translate.Extensions;

public static class TranslateExtension
{
    public static TranslateDto GenDto(this TranslateEntity entity)
    {
        return new TranslateDto
        {
            Id = entity.Id,
            Code = entity.Code,
        };
    }

    public static TranslateDetailDto GenDetailDto(this TranslateEntity entity)
    {
        return new TranslateDetailDto
        {
            Id = entity.Id,
            Code = entity.Code,
            Sentences = entity.Sentences.Select(e => e.GenDto()).ToList(),
        };
    }
}