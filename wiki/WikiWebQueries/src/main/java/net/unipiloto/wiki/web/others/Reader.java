package net.unipiloto.wiki.web.others;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import org.apache.sling.commons.json.JSONException;

public class Reader {

    public static String readContent(File file) throws FileNotFoundException, IOException {
        String content = "";
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            while (br.ready()) {
                content += br.readLine();
            }
        }
        return content;
    }

    public static void writeContent(File file, String content) throws FileNotFoundException, IOException, JSONException {
        try (PrintWriter wr = new PrintWriter(file)) {
            wr.write(content);
            wr.flush();
        }
    }
}
