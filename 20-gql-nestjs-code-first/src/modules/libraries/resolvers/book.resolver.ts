import { Args, Parent, Query, ResolveField, Resolver, Mutation } from '@nestjs/graphql';
import { Book } from '../gql-types/book.gql-type';
import { Author } from '../gql-types/author.gql-type';
import { AuthorModelDataModel, authors, BookModelDataModel } from '../../../mocks/data.mocks';
import { books } from '../../../mocks/data.mocks';
import { BookGqlMutationArgsType } from '../gql-types/book.gql-mutation-args.type';

@Resolver(() => Book)
export class BookResolver {

  @Query(() => [Book])
  books(
    @Args('id', { nullable: true }) bookId: string
  ): BookModelDataModel[] {
    if (bookId) {
      return [books.find(book => book.id === bookId)];
    }
    return books;
  }

  @Mutation(type => Book)
  addBook(@Args() mutationArgs: BookGqlMutationArgsType) {
    const lastBook = books[books.length - 1]
    const newId = lastBook.id + 1
    const newBook: BookModelDataModel = {
      id: newId,
      ...mutationArgs
    };
    books.push(newBook);
    return newBook;
  }

  @ResolveField(() => Author)
  author(
    @Parent() book: BookModelDataModel
  ): AuthorModelDataModel {
    return authors.find(author => book.author_id === author.id);
  }

}
