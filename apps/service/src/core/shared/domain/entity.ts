export abstract class Entity<TPrimitives = Record<string, any>> {
    abstract toPrimitives(): TPrimitives;
}
