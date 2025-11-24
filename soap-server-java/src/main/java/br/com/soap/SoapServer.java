package br.com.soap;

import jakarta.xml.ws.Endpoint;

public class SoapServer {
    public static void main(String[] args) {
        System.out.println("Servidor SOAP iniciado...");

        Endpoint.publish(
            "http://0.0.0.0:8081/FileService",
            new FileService()
        );

        System.out.println("WSDL disponível em: http://localhost:8081/FileService?wsdl");
    }
}
