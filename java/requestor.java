import java.util.function.*;
@FunctionalInterface
interface Requestor<T> {
  void resolve(Function<Object, T> callback, T value);
}

@FunctionalInterface
interface RequestorFactory<T, U> {
  Requestor<T> makeRequestor(U spec);
}
