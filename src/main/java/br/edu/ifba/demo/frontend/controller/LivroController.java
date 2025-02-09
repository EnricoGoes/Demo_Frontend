package br.edu.ifba.demo.frontend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class livroController {
    @Autowired

    @GetMapping("/")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        return mv;
    }
    
    @GetMapping("/Cadastro")
    public ModelAndView index1() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("form");
        return mv;
    }

    @GetMapping("/CadastroGenero")
    public ModelAndView index2() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("form2");
        return mv;
    }
}
