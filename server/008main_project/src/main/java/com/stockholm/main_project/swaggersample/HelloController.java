package com.stockholm.main_project.swaggersample;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stockholm")
public class HelloController {

    @Operation(summary = "hello post 요청", description = "post됩니다.", tags = { "Member" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                    content = @Content(schema = @Schema(implementation = HelloResponse.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping
    public ResponseEntity helloPost(
            @RequestBody HelloPostDto helloPostDto) {
        HelloResponse helloResponse = new HelloResponse();

        helloResponse.setId(1);
        helloResponse.setText(helloResponse.getText());

        return new ResponseEntity<>(helloResponse, HttpStatus.OK);
    }

    @Operation(summary = "hello get 요청", description = "get됩니다.", tags = { "Member" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                    content = @Content(schema = @Schema(implementation = HelloResponse.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("{id}")
    public  ResponseEntity helloGet(
            @Parameter(description = "id값")
            @PathVariable("id") String id) {
        HelloResponse helloResponse = new HelloResponse();

        helloResponse.setId(1);
        helloResponse.setText("hello");

        return new ResponseEntity<>(helloResponse, HttpStatus.OK);
    }
}
