import java.util.function.*;
@FunctionalInterface
interface Requestor<T> {
  void resolve(Function<T, Void> callback, T value);
}

@FunctionalInterface
interface RequestorFactory<T, U> {
  Requestor<T> makeRequestor(U spec);
}
