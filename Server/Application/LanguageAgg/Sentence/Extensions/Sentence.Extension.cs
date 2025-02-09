using Application.LanguageAgg.Sentence.DTOs;
using Application.LanguageAgg.Translate.Extensions;
using Domain.LanguageAgg;

namespace Application.LanguageAgg.Sentence.Extensions;

public static class SentenceExtension
{
    public static SentenceDto GenDto(this SentenceEntity entity)
    {
        return new SentenceDto
        {
            Id = entity.Id,
            RootId = entity.RootId,
            TypeId = entity.TypeId,
            Content = entity.Content,
            Root = entity.Root.GenDto(),
        };
    }
}