using System;
 
 public class Foo
{
    public string Bar { get; set; } = "bar";
}

// // ! this file has been written automatically by f_create_csharp_class.module.js at aprox Mon Nov 21 2022 14:30:12 GMT+0100 (Central European Standard Time)
public class O_chatroom{
        public int        n_id;
        public string        s_name;
        public int        n_o_file_n_id__file_one;
        public int        n_o_file_n_id__file_two;
        public int        n_o_file_n_id__file_three;

    public O_chatroom(
       int        n_id__constructor,
       string        s_name__constructor,
       int        n_o_file_n_id__file_one__constructor,
       int        n_o_file_n_id__file_two__constructor,
       int        n_o_file_n_id__file_three__constructor
    ){
       n_id = n_id__constructor;
       s_name = s_name__constructor;
       n_o_file_n_id__file_one = n_o_file_n_id__file_one__constructor;
       n_o_file_n_id__file_two = n_o_file_n_id__file_two__constructor;
       n_o_file_n_id__file_three = n_o_file_n_id__file_three__constructor;
    }
}

public class test {
 
    static public void Main()
    {
        Console.WriteLine("Hello World!");
        O_chatroom o_chatroom = new O_chatroom(
            0,//n_id
            "sadf",//s_name
            0,//n_o_file_n_id__file_one
            0,//n_o_file_n_id__file_two
            0//n_o_file_n_id__file_three
        );
        Console.WriteLine(o_chatroom);
        Console.WriteLine(o_chatroom.s_name);
      
    }
}