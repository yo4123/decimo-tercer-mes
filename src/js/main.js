 // Import our custom CSS
import '../scss/styles.scss'

      
 $( function(){

  const year = new Date().getFullYear() 
 

    $( "#tabs" ).tabs();
      
    $( "#btnabril" ).on( "click", function() {
       suma('btnabril')
     } )

     $( "#btnagosto" ).on( "click", function() {
      suma('btnagosto')
    } )

    
    $( "#btndiciembre" ).on( "click", function() {
      suma('btndiciembre')
    } )
    
 

      $('.formID').on('submit', function (event) {
        event.preventDefault()
      })
      
     
     
     function suma(monthsuma){
    
    
      var fechaplanilla
      if (monthsuma === 'btnabril') {
        fechaplanilla = '01/04/' + year  + ' AL 15/04/' +   year ;
   
       }

       if (monthsuma === 'btnagosto') {
        fechaplanilla =    '01/08/' +  year  + ' AL 15/08/' +   year ;
          
            }
      
        if (monthsuma === 'btndiciembre') {
          fechaplanilla =    '01/12/' +  year  + ' AL 15/12/' +   year ;
         
        } 
          
        $(".cmp_fechaplanilla").text(fechaplanilla)

   

      var mesbruto = 0
      switch (monthsuma) {
        case 'btnabril':

        $('#tabs-1').find('.xmes').each(function(index, value) { 
  
                mesbruto = mesbruto + eval($(this).val());
              //  console.log(mesbruto);

                var xbruto = mesbruto  /12
                //console.log('xiii bruto:' +xbruto)
                $('#decimobruto').text(xbruto.toFixed(2));

 
                var ss =  xbruto * (7.25/100) 
               // console.log('descuento ss:' + ss)
                $('#decimoss').text(ss.toFixed(2));

                var totaldesc =  ss;
        
                var xneto = xbruto - totaldesc
               // console.log('total neto recibir:' + xneto)
                $('#decimoneto').text(xneto.toFixed(2));
              
              
                 
                  document.getElementById("btncomprobante").focus()
              
              }
            )
            
            break;
            case 'btnagosto':

            $('#tabs-2').find('.xmes').each(function(index, value) { 
     
              mesbruto = mesbruto + eval($(this).val());
            //  console.log(mesbruto);

              var xbruto = mesbruto  /12
              //console.log('xiii bruto:' +xbruto)
              $('#decimobruto').text(xbruto.toFixed(2));


              var ss =  xbruto * (7.25/100) 
             // console.log('descuento ss:' + ss)
              $('#decimoss').text(ss.toFixed(2));

              var totaldesc =  ss;
      
              var xneto = xbruto - totaldesc
             // console.log('total neto recibir:' + xneto)
              $('#decimoneto').text(xneto.toFixed(2));
             
               
                document.getElementById("btncomprobante").focus()
            
            }
          )
          break;
          case 'btndiciembre':

          
          $('#tabs-3').find('.xmes').each(function(index, value) { 
     
            mesbruto = mesbruto + eval($(this).val());
          //  console.log(mesbruto);

            var xbruto = mesbruto  /12
            //console.log('xiii bruto:' +xbruto)
            $('#decimobruto').text(xbruto.toFixed(2));


            var ss =  xbruto * (7.25/100) 
           // console.log('descuento ss:' + ss)
            $('#decimoss').text(ss.toFixed(2));

            var totaldesc =  ss;
    
            var xneto = xbruto - totaldesc
           // console.log('total neto recibir:' + xneto)
            $('#decimoneto').text(xneto.toFixed(2));
          
         
            
             
              document.getElementById("btncomprobante").focus()
          
          }
        )
          
          break;

        

            default:
                console.log('Mes no válido');

          }
     
      }
       

      function generatePDF() {
 

        var doc = new jsPDF();
        var cmp_mesbruto = $('#decimobruto').text()
        var cmp_deduccion = $('#decimoss').text()
        var cmp_totalneto = $('#decimoneto').text()
        var cmp_fechaplanilla = $('.cmp_fechaplanilla').text()
        // Agregar contenido al PDF
        doc.setFontSize(8.5);
        doc.setFont(undefined, 'bold');
        doc.text("PLANILLA DECIMO", 10, 10);
        doc.text("Comprobante de Pago", 130, 10);
        doc.text("XIII MES", 10, 15);
        doc.text("INICIO LABORAL:", 130, 15);
        doc.text("NOMBRE:", 10, 20);
        doc.text("Planilla del: "+cmp_fechaplanilla+"", 130, 20);
        doc.text("Departamento:", 10, 35);
        doc.text("No. Cedula", 60, 35);
        doc.text("No. Seguro Social",95, 35);
        doc.text("Clave IR", 135, 35);
        doc.text("Rata X Hora", 175, 35);
        doc.text("No. Empelado: EMP", 10, 40);
        doc.text(" ", 60, 40); // cedula
        doc.text("A-0", 95, 40);
        doc.text("$ ", 175, 40);
        doc.text("Posicion:  ", 10, 50);
        doc.text("Salario Base: $  ", 135, 50);
        doc.text("Codigo", 10,60);
        doc.text("Descripcion", 60, 60);
        doc.text("Percepcion", 100, 60);
        doc.text("Deduccion", 140, 60);
        doc.text("Saldo", 180, 60);
        doc.text("126", 10, 65);
        doc.text("XIII Mes", 60, 65);
        doc.text("$ "+cmp_mesbruto+"", 100, 65);
        doc.text("", 180, 65);
        doc.text("$ "+cmp_mesbruto+"", 250, 65);
        doc.text("263", 10, 70);
        doc.text("Seguro Social", 60, 70);
        doc.text("", 120, 200);
        doc.text("$ "+cmp_deduccion+"", 140, 70);
        doc.text("", 250, 200);
        doc.text("Percepciones: $ "+cmp_mesbruto+"", 90, 90);
        doc.text("Deducciones: $ "+cmp_deduccion+"", 140, 90);
        doc.text("Salario Bruto: $ "+cmp_mesbruto+"", 10, 95);
        doc.text("Ausentismo: $ 0.00", 60, 95);
        doc.text("Deduc. Legal: $ "+cmp_deduccion+"", 90, 95);
        doc.text("Salario Neto: $ "+cmp_totalneto+"", 140, 95);
        doc.text("Recibido:__________________________", 10, 110);
        doc.text("Cedula:___________________________", 80, 110);
        
        // Guardar el PDF
        doc.save('comprobante_pago.pdf');
      }
       
 
       document.getElementById("btncomprobante").addEventListener("click", generatePDF);
 
   

 });

