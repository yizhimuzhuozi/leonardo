/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import * as d3 from 'd3';

// Create data based on colorspace


function createData(colors) {

  window.CAMArrayJ = [];
  window.CAMArrayA = [];
  window.CAMArrayB = [];
  window.LABArrayL = [];
  window.LABArrayA = [];
  window.LABArrayB = [];
  window.LCHArrayL = [];
  window.LCHArrayC = [];
  window.LCHArrayH = [];
  window.RGBArrayR = [];
  window.RGBArrayG = [];
  window.RGBArrayB = [];
  window.HSLArrayH = [];
  window.HSLArrayS = [];
  window.HSLArrayL = [];
  window.HSVArrayH = [];
  window.HSVArrayS = [];
  window.HSVArrayL = [];
  window.HSLuvArrayL = [];
  window.HSLuvArrayU = [];
  window.HSLuvArrayV = [];

  window.CAMArrayJmin = [];
  window.CAMArrayAmin = [];
  window.CAMArrayBmin = [];
  window.LABArrayLmin = [];
  window.LABArrayAmin = [];
  window.LABArrayBmin = [];
  window.LCHArrayLmin = [];
  window.LCHArrayCmin = [];
  window.LCHArrayHmin = [];
  window.RGBArrayRmin = [];
  window.RGBArrayGmin = [];
  window.RGBArrayBmin = [];
  window.HSLArrayHmin = [];
  window.HSLArraySmin = [];
  window.HSLArrayLmin = [];
  window.HSVArrayHmin = [];
  window.HSVArraySmin = [];
  window.HSVArrayLmin = [];
  window.HSLuvArrayLmin = [];
  window.HSLuvArrayUmin = [];
  window.HSLuvArrayVmin = [];


  let length = colors.length - 4
  var maxVal = 300;
  var maxDelta = Math.floor( length / maxVal );
  var minMaxVal = 25;
  var minDelta = Math.floor( length / minMaxVal );
  
  for(let i = 0; i < length; i += maxDelta){
    let jab = d3.jab(colors[i+4])
    let lab = d3.lab(colors[i+4])
    let hcl = d3.hcl(colors[i+4])
    let rgb = d3.rgb(colors[i+4])
    let hsl = d3.hsl(colors[i+4])
    let hsv = d3.hsv(colors[i+4])
    let hsluv = d3.hsluv(colors[i+4])

    
    CAMArrayJ.push(jab.J);
    CAMArrayA.push(jab.a);
    CAMArrayB.push(jab.b);
    LABArrayL.push(lab.l);
    LABArrayA.push(lab.a);
    LABArrayB.push(lab.b);
    LCHArrayL.push(hcl.l);
    LCHArrayC.push(hcl.c);
    LCHArrayH.push(hcl.h);
    RGBArrayR.push(rgb.r);
    RGBArrayG.push(rgb.g);
    RGBArrayB.push(rgb.b);
    HSLArrayH.push(hsl.h);
    HSLArrayS.push(hsl.s);
    HSLArrayL.push(hsl.l);
    HSVArrayH.push(hsv.h);
    HSVArrayS.push(hsv.s);
    HSVArrayL.push(hsv.v);
    HSLuvArrayL.push(hsluv.l);
    HSLuvArrayU.push(hsluv.u);
    HSLuvArrayV.push(hsluv.v);
  }

  for(let i = 0; i < length; i += minDelta){
    let jab = d3.jab(colors[i+4])
    let lab = d3.lab(colors[i+4])
    let hcl = d3.hcl(colors[i+4])
    let rgb = d3.rgb(colors[i+4])
    let hsl = d3.hsl(colors[i+4])
    let hsv = d3.hsv(colors[i+4])
    let hsluv = d3.hsluv(colors[i+4])

    CAMArrayJmin.push(jab.J);
    CAMArrayAmin.push(jab.a);
    CAMArrayBmin.push(jab.b);
    LABArrayLmin.push(lab.l);
    LABArrayAmin.push(lab.a);
    LABArrayBmin.push(lab.b);
    LCHArrayLmin.push(hcl.l);
    LCHArrayCmin.push(hcl.c);
    LCHArrayHmin.push(hcl.h);
    RGBArrayRmin.push(rgb.r);
    RGBArrayGmin.push(rgb.g);
    RGBArrayBmin.push(rgb.b);
    HSLArrayHmin.push(hsl.h);
    HSLArraySmin.push(hsl.s);
    HSLArrayLmin.push(hsl.l);
    HSVArrayHmin.push(hsv.h);
    HSVArraySmin.push(hsv.s);
    HSVArrayLmin.push(hsv.v);
    HSLuvArrayLmin.push(hsluv.l);
    HSLuvArrayUmin.push(hsluv.u);
    HSLuvArrayVmin.push(hsluv.v);
  }

  // this results in us losing some samples to NaN, but
  // is closish to doing it on the full array
  // and still faster

  for(let i = HSLArrayH.length - 1; i >= 0; i--){
    if(isNaN(HSLArrayH[i]) ||
      isNaN(HSLArrayS[i]) ||
      isNaN(HSLArrayL[i])){
      HSLArrayH.splice(i,1)
      HSLArrayS.splice(i,1)
      HSLArrayL.splice(i,1)
    }
    if(isNaN(HSVArrayH[i]) ||
      isNaN(HSVArrayS[i]) ||
      isNaN(HSVArrayL[i])){
      HSVArrayH.splice(i,1)
      HSVArrayS.splice(i,1)
      HSVArrayL.splice(i,1)
    }
    if(isNaN(LCHArrayL[i]) ||
      isNaN(LCHArrayC[i]) ||
      isNaN(LCHArrayH[i])){
      LCHArrayL.splice(i,1)
      LCHArrayC.splice(i,1)
      LCHArrayH.splice(i,1)
    }
  }

  for(let i = HSLArrayHmin.length - 1; i >= 0; i--){
    if(isNaN(HSLArrayHmin[i]) ||
      isNaN(HSLArraySmin[i]) ||
      isNaN(HSLArrayLmin[i])){
      HSLArrayHmin.splice(i,1)
      HSLArraySmin.splice(i,1)
      HSLArrayLmin.splice(i,1)
    }
    if(isNaN(HSVArrayHmin[i]) ||
      isNaN(HSVArraySmin[i]) ||
      isNaN(HSVArrayLmin[i])){
      HSVArrayHmin.splice(i,1)
      HSVArraySmin.splice(i,1)
      HSVArrayLmin.splice(i,1)
    }
    if(isNaN(LCHArrayLmin[i]) ||
      isNaN(LCHArrayCmin[i]) ||
      isNaN(LCHArrayHmin[i])){
      LCHArrayLmin.splice(i,1)
      LCHArrayCmin.splice(i,1)
      LCHArrayHmin.splice(i,1)
    }
  }


  // Filter out "NaN" values from these arrays

  function isANumber(value){
    return !Number.isNaN(value);
  }

  // CAM_J = CAM_J.filter(isANumber);
  // CAM_A = CAM_A.filter(isANumber);
  // CAM_B = CAM_B.filter(isANumber);
  // LAB_L = LAB_L.filter(isANumber);
  // LAB_A = LAB_A.filter(isANumber);
  // LAB_B = LAB_B.filter(isANumber);
  // LCH_L = LCH_L.filter(isANumber);
  // LCH_C = LCH_C.filter(isANumber);
  // LCH_H = LCH_H.filter(isANumber);
  // RGB_R = RGB_R.filter(isANumber);
  // RGB_G = RGB_G.filter(isANumber);
  // RGB_B = RGB_B.filter(isANumber);
  // HSL_H = HSL_H.filter(isANumber);
  // HSL_S = HSL_S.filter(isANumber);
  // HSL_L = HSL_L.filter(isANumber);
  // HSV_H = HSV_H.filter(isANumber);
  // HSV_S = HSV_S.filter(isANumber);
  // HSV_V = HSV_V.filter(isANumber);
  // HSLuv_L = HSLuv_L.filter(isANumber);
  // HSLuv_U = HSLuv_U.filter(isANumber);
  // HSLuv_V = HSLuv_V.filter(isANumber);


  const fillRange = (start, end) => {
    return Array(end - start + 1).fill().map((item, index) => start + index);
  };

  let dataX = fillRange(0, CAMArrayJ.length - 1);
  let dataXcyl = fillRange(0, LCHArrayL.length - 1);
  let dataXcontrast = fillRange(0, ratioInputs.length-1);

  window.labFullData = [
    {
      x: LABArrayL,
      y: LABArrayA,
      z: LABArrayB
    }
  ];


  window.camDataA = [
    {
      x: CAMArrayJmin,
      y: CAMArrayAmin
    }
  ];
  window.camDataB = [
    {
      x: CAMArrayJmin,
      y: CAMArrayBmin
    }
  ];
  window.camDataAB = [
    {
      x: CAMArrayAmin,
      y: CAMArrayBmin
    }
  ];

  window.labDataA = [
    {
      x: LABArrayLmin,
      y: LABArrayAmin
    }
  ];
  window.labDataB = [
    {
      x: LABArrayLmin,
      y: LABArrayBmin
    }
  ];
  window.labDataAB = [
    {
      x: LABArrayAmin,
      y: LABArrayBmin
    }
  ];

  window.lchDataC = [
    {
      x: LCHArrayLmin,
      y: LCHArrayCmin
    }
  ];
  window.lchDataH = [
    {
      x: LCHArrayLmin,
      y: LCHArrayHmin
    }
  ];
  window.lchDataCH = [
    {
      x: LCHArrayHmin,
      y: LCHArrayCmin
    }
  ];
  window.rgbDataR = [
    {
      x: RGBArrayRmin,
      y: RGBArrayGmin
    }
  ];
  window.rgbDataG = [
    {
      x: RGBArrayGmin,
      y: RGBArrayBmin
    }
  ];
  window.rgbDataB = [
    {
      x: RGBArrayBmin,
      y: RGBArrayRmin
    }
  ];
  window.hslDataH = [
    {
      x: HSLArrayLmin,
      y: HSLArrayHmin
    }
  ];
  window.hslDataS = [
    {
      x: HSLArrayLmin,
      y: HSLArraySmin
    }
  ];
  window.hslDataHS = [
    {
      x: HSLArrayHmin,
      y: HSLArraySmin
    }
  ];

  window.hsvDataH = [
    {
      x: HSVArrayLmin,
      y: HSVArrayHmin
    }
  ];
  window.hsvDataS = [
    {
      x: HSVArrayLmin,
      y: HSVArraySmin
    }
  ];
  window.hsvDataHS = [
    {
      x: HSVArrayHmin,
      y: HSVArraySmin
    }
  ];
  window.hsluvDataL = [
    {
      x: HSLuvArrayVmin,
      y: HSLuvArrayLmin
    }
  ];
  window.hsluvDataU = [
    {
      x: HSLuvArrayVmin,
      y: HSLuvArrayUmin
    }
  ];
  window.hsluvDataLU = [
    {
      x: HSLuvArrayLmin,
      y: HSLuvArrayUmin
    }
  ];
  window.contrastData = [
    {
      x: dataXcontrast,
      y: ratioInputs.map(function(d) {return parseFloat(d);}) // convert to number
    }
  ];
}

exports.createData = createData;
