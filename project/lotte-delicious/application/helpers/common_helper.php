<? if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function get_jaress_cnt($jaressid) {

    $CI = &get_instance();
    
    $CI->db->select();
    $CI->db->from('tz_jaress_like');
    $CI->db->where('jaressid',$jaressid);
    $query = $CI->db->get();
    
    if( $query->num_rows() == 0 ) {
        return 0;
    } 

    return $query->row()->cnt;
}

?>