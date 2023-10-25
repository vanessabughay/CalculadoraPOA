function formatarNumero(numero) {
    var numeroFormatado = numero.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return numeroFormatado;
}

function calcularMetas(){
    // Obter os valores dos campos de entrada
    var totalPreFixado = parseFloat(document.getElementById("totalPreFixado").value) || 0;
    var mediaComplHosp = parseFloat(document.getElementById("mediaComplHosp").value) || 0;
    var mediaComplAmb = parseFloat(document.getElementById("mediaComplAmb").value) || 0;

    // % Hospitalares 
    var hospPerc = (mediaComplHosp/(mediaComplAmb + mediaComplHosp));
    var metasHosp = (mediaComplAmb + mediaComplHosp) * hospPerc;
    var metasHospPerc = (hospPerc * 100).toFixed(2);

    // % Ambulatoriais
    var ambPerc = 1- hospPerc;
    var metasAmb = totalPreFixado * ambPerc;
    var metasAmbPerc = (ambPerc * 100).toFixed(2);

    // Qualitativas - 40%
    var totalQuali = 0.4 * totalPreFixado;

    // Quantitativas - 60%
    var totalQuanti = 0.6 * totalPreFixado;
    var metasQuantiAmb = totalQuanti * ambPerc;
    var metasQuantiHosp = totalQuanti * hospPerc;

   
    // Formatar número
    metasHosp = formatarNumero(metasHosp);
    metasAmb = formatarNumero(metasAmb);
    totalQuanti = formatarNumero(totalQuanti);
    metasQuantiAmb = formatarNumero(metasQuantiAmb);
    metasQuantiHosp = formatarNumero(metasQuantiHosp);
    totalQuali = formatarNumero(totalQuali);
    totalPreFixado = formatarNumero(totalPreFixado);


    // Atualizar os campos 
//    document.getElementById("metasHosp").textContent = metasHosp.toFixed(2).toLocaleString('pt-BR');
    document.getElementById("metasHospPerc").textContent = metasHospPerc + '%';
    document.getElementById("metasAmbPerc").textContent = metasAmbPerc + '%';
    document.getElementById("metasQuanti").textContent = totalQuanti;
    document.getElementById("metasQuantiAmb").textContent = metasQuantiAmb;
    document.getElementById("metasQuantiHosp").textContent = metasQuantiHosp;
    document.getElementById("metasQuali").textContent = totalQuali;
    document.getElementById("metasQuali1").textContent = totalQuali;
    document.getElementById("total").textContent = totalPreFixado;

}

function calcular1QuantiAmb() {
    var aux = 0;

    // Obter os valores dos campos de entrada
    var metaGrupo02 = parseFloat(document.getElementById("metaGrupo02").value) || 0;
    var metaGrupo03 = parseFloat(document.getElementById("metaGrupo03").value) || 0;
    var metaGrupo04 = parseFloat(document.getElementById("metaGrupo04").value) || 0;
    var aprovGrupo02 = parseFloat(document.getElementById("aprovGrupo02").value) || 0;
    var aprovGrupo03 = parseFloat(document.getElementById("aprovGrupo03").value) || 0;
    var aprovGrupo04 = parseFloat(document.getElementById("aprovGrupo04").value) || 0;

    // Calcular a soma
    var somaMeta = metaGrupo02 + metaGrupo03 + metaGrupo04;
    var somaAprov = aprovGrupo02 + aprovGrupo03 + aprovGrupo04;
    
    // Grupo 02
    if(aprovGrupo02 >= metaGrupo02) {
        var valorGrupo02aux = 1;
    }
    else {
        var valorGrupo02aux = aprovGrupo02/metaGrupo02;
    }
    valorGrupo02 = (valorGrupo02aux * 100).toFixed(2);
    if (metaGrupo02 != 0) {
        aux ++;
    }

    // Grupo 03
    if(aprovGrupo03 >= metaGrupo03) {
        var valorGrupo03aux = 1;
    }
    else {
        var valorGrupo03aux = aprovGrupo03/metaGrupo03;
    }
    valorGrupo03 = (valorGrupo03aux * 100).toFixed(2);
    if (metaGrupo03 != 0) {
        aux ++;
    }

    // Grupo 04
    if(aprovGrupo04 >= metaGrupo04) {
        var valorGrupo04aux = 1;
    }
    else {
        var valorGrupo04aux = aprovGrupo04/metaGrupo04;
    }    
    valorGrupo04 = (valorGrupo04aux * 100).toFixed(2); 
    if (metaGrupo04 != 0) {
        aux ++;
    }

    // Total
    var valorPercaux = (valorGrupo02aux + valorGrupo03aux + valorGrupo04aux)/aux;
    var valorPerc = (valorPercaux * 100).toFixed(2); 

    // Atualizar os campos 
    document.getElementById("totalMeta").textContent = somaMeta.toLocaleString('pt-BR');
    document.getElementById("totalAprov").textContent = somaAprov.toLocaleString('pt-BR');
    document.getElementById("percGrupo02").textContent = valorGrupo02 + '%';
    document.getElementById("percGrupo03").textContent = valorGrupo03 + '%';
    document.getElementById("percGrupo04").textContent = valorGrupo04 + '%';
    document.getElementById("somaPerc").textContent = valorPerc + '%';
}


function calcular1QuantiHosp() {
    var aux1 = 0;

    // Obter os valores dos campos de entrada
    var metaUE = parseFloat(document.getElementById("metaUE").value) || 0;
    var aprovUE = parseFloat(document.getElementById("aprovUE").value) || 0;
    var metaElet = parseFloat(document.getElementById("metaElet").value) || 0;
    var aprovElet = parseFloat(document.getElementById("aprovElet").value) || 0;
    var metaUCP = parseFloat(document.getElementById("metaUCP").value) || 0;
    var aprovUCP = parseFloat(document.getElementById("aprovUCP").value) || 0;

    // Calcular a soma
    var totalMetaQuantiHosp = metaUE + metaElet + metaUCP;
    var totalAprovQuantiHosp = aprovUE + aprovElet + aprovUCP;

    // Cálculo Média Ponderada
    var pondUEAux = metaUE/totalMetaQuantiHosp;
    var pondEletAux = metaElet/totalMetaQuantiHosp;
    var pondUCPAux = metaUCP/totalMetaQuantiHosp;

    // Percentual Atingido Urgência/Emergência
    if(aprovUE >= metaUE) {
        var percUEAux = pondUEAux;
    }
    else {
        var percUEAux = pondUEAux*aprovUE/metaUE;
    }
    if (metaUE != 0) {
        aux1 ++;
    }

    // Percentual Atingido Eletivas
    if(aprovElet >= metaElet) {
        var percEletAux = pondEletAux;
    }
    else {
        var percEletAux = pondEletAux*aprovElet/metaElet;
    }
    if (metaElet != 0) {
        aux1 ++;
    }

     // Percentual Atingido UCP
     if(aprovUCP >= metaUCP) {
        var percUCPAux = pondUCPAux;
    }
    else {
        var percUCPAux = pondUCPAux*aprovUCP/metaUCP;
    }
    if (metaUCP != 0) {
        aux1 ++;
    }

    // Percentual Atingido Total
    var pondQuantiHospAux = pondUEAux + pondEletAux + pondUCPAux;
    var percQuantiHospAux = percUEAux + percEletAux + percUCPAux;
    
    // Transformar em percentual
    var pondUE = (pondUEAux * 100).toFixed(2);
    var percUE = (percUEAux * 100).toFixed(2);
    var pondElet = (pondEletAux * 100).toFixed(2);
    var percElet = (percEletAux * 100).toFixed(2);
    var pondUCP = (pondUCPAux * 100).toFixed(2);
    var percUCP = (percUCPAux * 100).toFixed(2);
    var pondQuantiHosp = (pondQuantiHospAux * 100).toFixed(2);
    var percQuantiHosp = (percQuantiHospAux * 100).toFixed(2);

    // Atualizar os campos 
    document.getElementById("pondUE").textContent = pondUE + '%';
    document.getElementById("percUE").textContent = percUE + '%';
    document.getElementById("pondElet").textContent = pondElet + '%';
    document.getElementById("percElet").textContent = percElet + '%';
    document.getElementById("pondUCP").textContent = pondUCP + '%';
    document.getElementById("percUCP").textContent = percUCP + '%';
    document.getElementById("pondQuantiHosp").textContent = pondQuantiHosp + '%';
    document.getElementById("percQuantiHosp").textContent = percQuantiHosp + '%';
    document.getElementById("totalMetaQuantiHosp").textContent = totalMetaQuantiHosp;
    document.getElementById("totalAprovQuantiHosp").textContent = totalAprovQuantiHosp;
}

function calcular1QuantiHospOld() {
    var aux1Old = 0;

    // Obter os valores dos campos de entrada
    var metaUEOld = parseFloat(document.getElementById("metaUEOld").value) || 0;
    var aprovUEOld = parseFloat(document.getElementById("aprovUEOld").value) || 0;
    var metaEletOld = parseFloat(document.getElementById("metaEletOld").value) || 0;
    var aprovEletOld = parseFloat(document.getElementById("aprovEletOld").value) || 0;
    var metaUCPOld = parseFloat(document.getElementById("metaUCPOld").value) || 0;
    var aprovUCPOld = parseFloat(document.getElementById("aprovUCPOld").value) || 0;

    // Calcular a soma
    var totalMetaQuantiHospOld = metaUEOld + metaEletOld + metaUCPOld;
    var totalAprovQuantiHospOld = aprovUEOld + aprovEletOld + aprovUCPOld;

    // Cálculo Média Aritmética
    var aritUEAuxOld = aprovUEOld/metaUEOld;
    var aritEletAuxOld = aprovEletOld/metaEletOld;
    var aritUCPAuxOld = aprovUCPOld/metaUCPOld;

    // Percentual Atingido Urgência/Emergência
    if(aprovUEOld >= metaUEOld) {
        var percUEAuxOld = 1;
    }
    else {
        var percUEAuxOld = aritUEAuxOld;
    }
    if (metaUEOld != 0) {
        aux1Old ++;
    }

    // Percentual Atingido Eletivas
    if(aprovEletOld >= metaEletOld) {
        var percEletAuxOld = 1;
    }
    else {
        var percEletAuxOld = aritEletAuxOld;
    }
    if (metaEletOld != 0) {
        aux1Old ++;
    }

     // Percentual Atingido UCP
     if(aprovUCPOld >= metaUCPOld) {
        var percUCPAuxOld = 1;
    }
    else {
        var percUCPAuxOld = aritUCPAuxOld;
    }
    if (metaUCPOld != 0) {
        aux1Old ++;
    }

    // Percentual Atingido Total
    var aritQuantiHospAuxOld = (aritUEAuxOld + aritEletAuxOld + aritUCPAuxOld)/aux1Old;
    var percQuantiHospAuxOld = (percUEAuxOld + percEletAuxOld + percUCPAuxOld)/aux1Old;
    
    // Transformar em percentual
    var aritUEOld = (aritUEAuxOld * 100).toFixed(2);
    var percUEOld = (percUEAuxOld * 100).toFixed(2);
    var aritEletOld = (aritEletAuxOld * 100).toFixed(2);
    var percEletOld = (percEletAuxOld * 100).toFixed(2);
    var aritUCPOld = (aritUCPAuxOld * 100).toFixed(2);
    var percUCPOld = (percUCPAuxOld * 100).toFixed(2);
  //  var aritQuantiHospOld = (aritQuantiHospAuxOld * 100).toFixed(2);
    var percQuantiHospOld = (percQuantiHospAuxOld * 100).toFixed(2);

    // Atualizar os campos 
    document.getElementById("aritUEOld").textContent = aritUEOld + '%';
    document.getElementById("percUEOld").textContent = percUEOld + '%';
    document.getElementById("aritEletOld").textContent = aritEletOld + '%';
    document.getElementById("percEletOld").textContent = percEletOld + '%';
    document.getElementById("aritUCPOld").textContent = aritUCPOld + '%';
    document.getElementById("percUCPOld").textContent = percUCPOld + '%';
   // document.getElementById("aritQuantiHospOld").textContent = aritQuantiHospOld + '%';
    document.getElementById("percQuantiHospOld").textContent = percQuantiHospOld + '%';
    document.getElementById("totalMetaQuantiHospOld").textContent = totalMetaQuantiHospOld;
    document.getElementById("totalAprovQuantiHospOld").textContent = totalAprovQuantiHospOld;
}
