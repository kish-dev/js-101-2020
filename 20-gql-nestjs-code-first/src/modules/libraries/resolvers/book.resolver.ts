import {Args, Parent, Query, ResolveField, Resolver, Mutation} from '@nestjs/graphql';
import {Book} from '../gql-types/book.gql-type';
import {Author} from '../gql-types/author.gql-type';
import {AuthorModelDataModel, authors, BookModelDataModel} from '../../../mocks/data.mocks';
import {books} from '../../../mocks/data.mocks';
import {BookGqlMutationArgsType} from '../gql-types/book.gql-mutation-args.type';

@Resolver(() => Book)
export class BookResolver {

    @Query(() => [Book])
    books(
        @Args('id', {nullable: true}) bookId: string
    ): BookModelDataModel[] {
        if (bookId) {
            return [books.find(book => book.id === bookId)];
        }
        return books;
    }

    @Mutation(type => Book)
    changeBookName(@Args() mutationArgs: BookGqlMutationArgsType) {
        const bookToChange = books.find(book => book.id === mutationArgs.id
            && book.title != mutationArgs.title
            && book.author_id === mutationArgs.author_id
            && book.publicationDate === mutationArgs.publicationDate);

        switch (bookToChange) {
            case null:
                return null
            default:
                bookToChange.title = mutationArgs.title
                return bookToChange
        }
    }

    @ResolveField(() => Author)
    author(
        @Parent() book: BookModelDataModel
    ): AuthorModelDataModel {
        return authors.find(author => book.author_id === author.id);
    }

}
