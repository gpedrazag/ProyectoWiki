package net.unipiloto.wiki.web.controllers;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.others.ImageRegister;
import net.unipiloto.wiki.web.others.Reader;
import net.unipiloto.wiki.web.transactions.AlternativeTransaction;
import net.unipiloto.wiki.web.transactions.ArtifactTransaction;
import net.unipiloto.wiki.web.transactions.AssumptionTransaction;
import net.unipiloto.wiki.web.transactions.ConcernTransaction;
import net.unipiloto.wiki.web.transactions.ConstraintTransaction;
import net.unipiloto.wiki.web.transactions.CriteriaTransaction;
import net.unipiloto.wiki.web.transactions.DecisionTransaction;
import net.unipiloto.wiki.web.transactions.EvaluationTransaction;
import net.unipiloto.wiki.web.transactions.FunctionalRequerimentTransaction;
import net.unipiloto.wiki.web.transactions.QualityAttributeTransaction;
import net.unipiloto.wiki.web.transactions.ResponsibleTransaction;
import net.unipiloto.wiki.web.transactions.SoftwareArchitectureTransaction;
import org.apache.sling.commons.json.JSONException;
import org.boon.json.JsonFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/fileManager")
public class FileManagerController {

    @RequestMapping(value = "/saveData", method = RequestMethod.POST)
    public boolean saveData(@RequestParam(value = "json") String json) {
        boolean saved = true;
        try {
            String sep = System.getProperty("file.separator");
            String outreach = System.getProperty("catalina.home") + sep + "outreach";
            File dir = new File(outreach + sep + "registers" + sep);
            if (!dir.exists()) {
                dir.mkdir();
            }
            File data = new File(dir.getAbsolutePath() + sep + "data.json");
            if (!data.exists()) {

                data.createNewFile();

            }
            String s = Reader.readContent(data);
            List<ImageRegister> registers = new ArrayList();
            if (!s.equals("")) {
                registers = JsonFactory.fromJsonArray(s, ImageRegister.class);
            }
            List<ImageRegister> nRegisters = JsonFactory.fromJsonArray(json, ImageRegister.class);
            for (ImageRegister i : nRegisters) {
                registers.add(i);
            }
            Reader.writeContent(data, JsonFactory.toJson(registers));
        } catch (IOException | JSONException ex) {
            saved = false;
        }
        return saved;
    }

    @RequestMapping(value = "/deleteFile", method = RequestMethod.POST)
    public boolean deleteFile(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "type") String type) {

        boolean deleted = true;
        try {
            String sep = System.getProperty("file.separator");
            String outreach = System.getProperty("catalina.home") + sep + "outreach";
            File dir = new File(outreach + sep + "registers" + sep);
            File data = new File(dir.getAbsolutePath() + sep + "data.json");
            String s = Reader.readContent(data);
            List<ImageRegister> registers = new ArrayList();
            if (!s.equals("")) {
                registers = JsonFactory.fromJsonArray(s, ImageRegister.class);
            }
            List<ImageRegister> regClone = new ArrayList(registers);
            int i = 0;
            for (ImageRegister ir : registers) {
                if (ir.getType().equals(type) && ir.getName().equals(name)) {
                    ir.getReferences().stream().forEach((reference) -> {
                        deleteUpdateInOntology(reference, ir.getContent(), name, 0);
                    });
                    regClone.remove(i);
                    i--;
                }
                i++;
            }
            Reader.writeContent(data, JsonFactory.toJson(regClone));
            File img = new File(outreach + sep + "images" + sep + name);
            if (img.exists()) {
                img.delete();
            }
        } catch (IOException | JSONException ex) {
            deleted = false;
        }

        return deleted;
    }

    @RequestMapping(value = "/updateFile", method = RequestMethod.POST)
    public boolean updateFile(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "nName") String nName,
            @RequestParam(value = "type") String type) {

        boolean saved = true;
        try {
            String sep = System.getProperty("file.separator");
            String outreach = System.getProperty("catalina.home") + sep + "outreach";
            File dir = new File(outreach + sep + "registers" + sep);
            File data = new File(dir.getAbsolutePath() + sep + "data.json");
            String s = Reader.readContent(data);
            List<ImageRegister> registers = new ArrayList();
            if (!s.equals("")) {
                registers = JsonFactory.fromJsonArray(s, ImageRegister.class);
            }
            int i = 0;
            for (ImageRegister ir : registers) {
                if (ir.getType().equals(type) && ir.getName().equals(name)) {
                    registers.get(i).setName(nName);
                    String oc = registers.get(i).getContent();
                    String nc = oc.replace(name, nName);
                    registers.get(i).setContent(nc);
                    ir.getReferences().stream().forEach((reference) -> {
                        deleteUpdateInOntology(reference, oc, nc, 1);
                    });
                }
                i++;
            }
            if (type.equals("local")) {
                File img = new File(outreach + sep + "images" + sep + name);
                if (img.exists()) {
                    img.renameTo(new File(outreach + sep + "images" + sep + nName));
                }
            }
            Reader.writeContent(data, JsonFactory.toJson(registers));
        } catch (IOException | JSONException ex) {
            saved = false;
        }

        return saved;
    }

    private void deleteUpdateInOntology(String reference, String oc, String nc, int action) {
        switch (reference) {
            case "/Alternative/":
                if (action == 0) {
                    AlternativeTransaction.deleteContent(oc);
                } else {
                    AlternativeTransaction.updateContent(oc, nc);
                }
                break;
            case "/Artifact/":
                if (action == 0) {
                    ArtifactTransaction.deleteContent(oc);
                } else {
                    ArtifactTransaction.updateContent(oc, nc);
                }
                break;
            case "/Assumption/":
                if (action == 0) {
                    AssumptionTransaction.deleteContent(oc);
                } else {
                    AssumptionTransaction.updateContent(oc, nc);
                }
                break;
            case "/Concern/":
                if (action == 0) {
                    ConcernTransaction.deleteContent(oc);
                } else {
                    ConcernTransaction.updateContent(oc, nc);
                }
                break;
            case "/Constraint/":
                if (action == 0) {
                    ConstraintTransaction.deleteContent(oc);
                } else {
                    ConstraintTransaction.updateContent(oc, nc);
                }
                break;
            case "/Criteria/":
                if (action == 0) {
                    CriteriaTransaction.deleteContent(oc);
                } else {
                    CriteriaTransaction.updateContent(oc, nc);
                }
                break;
            case "/Decision/":
                if (action == 0) {
                    DecisionTransaction.deleteContent(oc);
                } else {
                    DecisionTransaction.updateContent(oc, nc);
                }
                break;
            case "/Evaluation/":
                if (action == 0) {
                    EvaluationTransaction.deleteContent(oc);
                } else {
                    EvaluationTransaction.updateContent(oc, nc);
                }
                break;
            case "/FunctionalRequeriment/":
                if (action == 0) {
                    FunctionalRequerimentTransaction.deleteContent(oc);
                } else {
                    FunctionalRequerimentTransaction.updateContent(oc, nc);
                }
                break;
            case "/QualityAttributeStage/":
                if (action == 0) {
                    QualityAttributeTransaction.deleteContent(oc);
                } else {
                    QualityAttributeTransaction.updateContent(oc, nc);
                }
                break;
            case "/Responsible/":
                if (action == 0) {
                    ResponsibleTransaction.deleteContent(oc);
                } else {
                    ResponsibleTransaction.updateContent(oc, nc);
                }
                break;
            case "/SoftwareArchitecture/":
                if (action == 0) {
                    SoftwareArchitectureTransaction.deleteContent(oc);
                } else {
                    SoftwareArchitectureTransaction.updateContent(oc, nc);
                }
                break;
        }
    }

}
