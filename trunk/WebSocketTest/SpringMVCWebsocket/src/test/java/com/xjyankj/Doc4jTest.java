package com.xjyankj;

import org.docx4j.convert.out.HTMLSettings;
import org.docx4j.convert.out.html.AbstractHTMLExporter3;
import org.docx4j.convert.out.html.HTMLExporterVisitor;
import org.docx4j.convert.out.html.HTMLExporterVisitorGenerator;
import org.docx4j.convert.out.html.HTMLExporterXslt;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.junit.Test;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import static org.junit.Assert.fail;

public class Doc4jTest {

    @Test
    public void startTest(){
        try {
            WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(new File("E://test.docx"));
            MainDocumentPart mainDocumentPart = wordMLPackage.getMainDocumentPart();
            AbstractHTMLExporter3 htmlExporter = new HTMLExporterXslt();
            HTMLSettings settings = new HTMLSettings();
            settings.setWmlPackage(wordMLPackage);
            settings.setImageDirPath("E://testImage/");
            settings.setImageTargetUri("testImage");
            htmlExporter.export(settings,new FileOutputStream(new File("E://test.html")));
        } catch (Docx4JException e) {
            e.printStackTrace();
            fail();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            fail();
        }
    }
}
