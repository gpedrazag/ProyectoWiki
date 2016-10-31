package net.unipiloto.wiki.web.controllers;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/uploader")
public class UploadFilesController {

    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    public String uploadFileHandler(@RequestParam("name") String name,
            @RequestParam("file") MultipartFile file) {

        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
                
                String sep = System.getProperty("file.separator");
                String outreach = System.getProperty("catalina.home")+sep+"outreach";
                File dir = new File(outreach+sep+"images");
                if (!dir.exists()) {
                    dir.mkdirs();
                }

                File img = new File(dir.getAbsolutePath()
                        + sep + name);
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(img));
                stream.write(bytes);
                stream.close();

                return "{\"val\":true, \"result\":\"Imagen con nombre="+name+" guardada correctamente\"}";
            } catch (Exception e) {
                return "{\"val\":false, \"result\":\"Imagen con nombre="+name+" no se guardó correctamente\"}";
            }
        } else {
            return "{val:false, result:'Archivo vacío'}";
        }
    }

    @RequestMapping(value = "/uploadMultipleFile", method = RequestMethod.POST)
    public String uploadMultipleFileHandler(@RequestParam("names") String[] names,
            @RequestParam("file") MultipartFile[] files) {

        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            String name = names[i];
            try {
                byte[] bytes = file.getBytes();

                String sep = System.getProperty("file.separator");
                String outreach = System.getProperty("catalina.home")+sep+"outreach";
                File dir = new File(outreach+sep+"images");
                if (!dir.exists()) {
                    dir.mkdirs();
                }

                File img = new File(dir.getAbsolutePath()
                        + sep + name);
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(img));
                stream.write(bytes);
                stream.close();

            } catch (Exception e) {
                return "{\"val\":false, \"result\":\"Imagen con nombre "+name+" no se guardó correctamente\"}";
            }
        }
        return "{\"val\":true, \"result\":\"Las imágenes se cargaron satisfactoriamente\"}";
    }

}
