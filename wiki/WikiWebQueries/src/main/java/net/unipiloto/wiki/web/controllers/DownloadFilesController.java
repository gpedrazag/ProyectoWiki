package net.unipiloto.wiki.web.controllers;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;
import net.unipiloto.wiki.web.others.Image;
import net.unipiloto.wiki.web.others.ImageRegister;
import net.unipiloto.wiki.web.others.Reader;
import org.boon.json.JsonFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/downloader")
public class DownloadFilesController {

    @RequestMapping(value = "/getImage", method = RequestMethod.POST)
    public String getImage(@RequestParam(value = "name") String name) {
        String json = "{\"error\":true}";
        try {
            String sep = System.getProperty("file.separator");
            String outreach = System.getProperty("catalina.home") + sep + "outreach";
            File img = new File(outreach + sep + "images" + sep + name);
            if (img.exists()) {
                BufferedImage bimg = ImageIO.read(img);
                FileInputStream is = new FileInputStream(img);
                byte[] bytes = new byte[(int) img.length()];
                String resolution = bimg.getWidth() + "x" + bimg.getHeight();
                String ext = img.getName().split("\\.")[1];
                ext = (ext != null) ? (ext.equals("jpg") ? "jpeg" : ext) : "jpeg";
                is.read(bytes, 0, bytes.length);
                String base64 = "data:image/" + ext + ";base64," + Base64.getEncoder().encodeToString(bytes);
                is.close();
                json = JsonFactory.toJson(new Image(name, base64, resolution));
            }

        } catch (IOException ex) {

        }
        return json;
    }

    @RequestMapping(value = "/getAllImagesNames", method = RequestMethod.POST)
    public String getAllImagesNames() {
        String json = "{\"error\":true}";
        List<Image> list = new ArrayList();
        String sep = System.getProperty("file.separator");
        String outreach = System.getProperty("catalina.home") + sep + "outreach";
        File dir = new File(outreach + sep + "images" + sep);
        if (dir.isDirectory()) {
            File[] images = dir.listFiles();
            for (File img : images) {
                list.add(new Image(img.getName()));
            }
            Collections.sort(list, (Image o1, Image o2) -> o1.getName().compareToIgnoreCase(o2.getName()));
        }
        if (!list.isEmpty()) {
            json = JsonFactory.toJson(list);
        }
        return json;
    }

    @RequestMapping(value = "/getAllURLImages", method = RequestMethod.POST)
    public String getAllURLImages() {
        String json = "{\"error\":true}";
        String sep = System.getProperty("file.separator");
        String outreach = System.getProperty("catalina.home") + sep + "outreach";
        File data = new File(outreach + sep + "registers" + sep + "data.json");
        if (data.exists()) {
            try {
                List<ImageRegister> registers = new ArrayList();
                String content = Reader.readContent(data);
                if (!content.equals("")) {
                    registers = JsonFactory.fromJsonArray(content, ImageRegister.class);
                    Collections.sort(registers, (ImageRegister o1, ImageRegister o2) -> o1.getName().compareToIgnoreCase(o2.getName()));
                }
                List<ImageRegister> nRegisters = new ArrayList();
                String lastName = "";
                for (ImageRegister r : registers) {
                    if (r.getType().equals("url") && (lastName.equals("") || (!r.getName().equals(lastName)))) {
                        nRegisters.add(r);
                        lastName = r.getName();
                    }
                }
                if (!nRegisters.isEmpty()) {
                    json = JsonFactory.toJson(nRegisters);
                }
            } catch (IOException ex) {
                Logger.getLogger(DownloadFilesController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return json;
    }
}
