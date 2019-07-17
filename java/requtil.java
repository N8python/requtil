import java.util.*;
import java.util.function.*;
public class Requtil {
  private static int index = 0;
  static <T> void  sequence (List<Requestor<T>> seq, T initial){
    Thread sequenceThread = new Thread(
      () -> {
        Function<T, Void> pass = new Function<T, Void>() {
            public Void apply(T value) {
              index += 1;
              if(index >= seq.size()){
                index = 0;
                return null;
              }
              seq.get(index).resolve(this::apply, value);
              return null;
            }
        };
        seq.get(index).resolve(pass, initial);
      }
    );
    sequenceThread.start();
  }
}
