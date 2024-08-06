<?php

class zm_Cipher{
	
	private $securekey;

	function __construct() {
		$this->securekey = SECURE_KEY;//hash('sha256',SECURE_KEY,TRUE);
	}

	//// 암호화
    function encrypt($sText) {
		$cntData  =  strlen($sText)  -  1;
		$cntCode  =  strlen($this->securekey)  -  1;
		
		$arrData  =  array();
        $arrCode  =  array();
		
		for($i  =  0;$cntData >= $i;  $i++){
			$arrData[$i]  =  substr($sText,$i,1);
		}
		
		for($i  =  0;$cntCode  >=  $i;  $i++){
			$arrCode[$i]  =  substr($this->securekey,$i,1);
		}
		
		$flag  =  0;
		$strResult  =  "";
		
		for($i  =  0;$cntData  >=  $i;  $i++){
			
			$strResult  =  $strResult  .  (ord($arrData[$i])  ^  ord($arrCode[$flag]))  .  chr(8);
			
			if($flag  ==  $cntCode){
				$flag  =  0;
			}else{
				$flag++;
			}
		}
		
		return  base64_encode($strResult);
	}
	
	/// 복호화
	function decrypt($sText) {
		if($sText){
			$sText  =  base64_decode($sText);
			 
			$arrData  =  explode(chr(8),  $sText);
			$arrCode  =  array();
			
			$cntData  =  count($arrData)  -  2;
			$cntCode  =  strlen($this->securekey)  -  1;
			
			for($i  =  0;  $cntCode  >=  $i;  $i++){
				$arrCode[$i]  =  substr($this->securekey,$i,1);
			}
			
			$flag  =  0;
			$strResult  =  "";
			
			for($i  =  0;$cntData  >=  $i;  $i++){
				$strResult  =  $strResult  .  chr((int)($arrData[$i])  ^  ord($arrCode[$flag]));

				if($flag  ==  $cntCode){
					$flag  =  0;
				}else{
					$flag++;
				}
			}
			
			return $strResult;  
		}else{
			return null;
		}
    }
}

class zm_Cipher_Close{
	function zm_Cipher_Close() {
		if( $this->securekey == 0) return;

		$this->securekey = 0;
	}
}

?>