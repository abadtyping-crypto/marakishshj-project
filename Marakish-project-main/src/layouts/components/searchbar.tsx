import type { BoxProps } from '@mui/material/Box';

import { useTranslation } from 'react-i18next';
import { varAlpha } from 'minimal-shared/utils';
import { getDocs, collection } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemButton from '@mui/material/ListItemButton';
import CircularProgress from '@mui/material/CircularProgress';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { db } from 'src/firebase';

import { Iconify } from 'src/components/iconify';
import { useSearch } from 'src/components/search-context';

// ----------------------------------------------------------------------

export function Searchbar({ sx, ...other }: BoxProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();

  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [parking, setParking] = useState<any[]>([]);
  const [portals, setPortals] = useState<any[]>([]);

  useEffect(() => {
    if (open && vehicles.length === 0) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [vehSnap, venSnap, parSnap, porSnap] = await Promise.all([
            getDocs(collection(db, 'vehicles')),
            getDocs(collection(db, 'vendorsList')),
            getDocs(collection(db, 'parkingList')),
            getDocs(collection(db, 'bankPortal')),
          ]);
          setVehicles(vehSnap.docs.map(d => ({ id: d.id, ...d.data() })));
          setVendors(venSnap.docs.map(d => ({ id: d.id, ...d.data() })));
          setParking(parSnap.docs.map(d => ({ id: d.id, ...d.data() })));
          setPortals(porSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (error) {
          console.error("Error fetching search data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [open, vehicles.length]);

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim() && !pathname.includes('/vehicles')) {
      navigate('/vehicles');
    }
    handleClose();
  }, [searchQuery, pathname, navigate, handleClose]);

  const results = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();

    const matchedVehicles = vehicles.filter(v => 
      String(v.vinChassisNumber || '').toLowerCase().includes(q) ||
      String(v.serialNumber || '').toLowerCase().includes(q) ||
      String(v.crn || '').toLowerCase().includes(q) ||
      String(v.manufacturer || '').toLowerCase().includes(q) ||
      String(v.model || '').toLowerCase().includes(q)
    ).slice(0, 5);

    const matchedVendors = vendors.filter(v => String(v.name || v.id).toLowerCase().includes(q)).slice(0, 3);
    const matchedParking = parking.filter(p => String(p.parkingLocation || p.id).toLowerCase().includes(q)).slice(0, 3);
    const matchedPortals = portals.filter(p => String(p.bankPortalName || p.id).toLowerCase().includes(q)).slice(0, 3);

    return {
      vehicles: matchedVehicles,
      vendors: matchedVendors,
      parking: matchedParking,
      portals: matchedPortals,
    };
  }, [searchQuery, vehicles, vendors, parking, portals]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <Box
            sx={{
              top: 0,
              insetInlineStart: 0,
              zIndex: 99,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              boxShadow: theme.vars.customShadows.z8,
              backdropFilter: `blur(6px)`,
              WebkitBackdropFilter: `blur(6px)`,
              backgroundColor: varAlpha(theme.vars.palette.background.defaultChannel, 0.8),
              ...sx,
            }}
            {...other}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: { xs: 3, md: 5 },
                height: {
                  xs: 'var(--layout-header-mobile-height)',
                  md: 'var(--layout-header-desktop-height)',
                },
                gap: 2,
              }}
            >
              <Input
                autoFocus
                fullWidth
                disableUnderline
                placeholder={`${t('common.search')}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                }
                endAdornment={
                  searchQuery && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery('')}>
                        <Iconify icon="mingcute:close-line" />
                      </IconButton>
                    </InputAdornment>
                  )
                }
                sx={{ fontWeight: 'fontWeightBold' }}
              />
              <Button variant="contained" onClick={handleSearch} sx={{ gap: 1, px: 1.5, flexShrink: 0 }}>
                {t('common.search')}
              </Button>
            </Box>

            {/* Results Dropdown */}
            {searchQuery.trim() && (
              <Box sx={{ px: { xs: 3, md: 5 }, pb: 3, width: '100%' }}>
                <Paper sx={{ maxHeight: 400, overflow: 'auto', border: 1, borderColor: 'divider' }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : results && (results.vehicles.length > 0 || results.vendors.length > 0 || results.parking.length > 0 || results.portals.length > 0) ? (
                    <List disablePadding>
                      {results.vehicles.length > 0 && (
                        <>
                          <ListSubheader sx={{ bgcolor: 'background.neutral' }}>Vehicles</ListSubheader>
                          {results.vehicles.map(v => (
                            <ListItemButton key={v.id} onClick={() => { setSearchQuery(v.vinChassisNumber || v.serialNumber); handleSearch(); }}>
                              <ListItemText 
                                primary={`${v.manufacturer} ${v.model} (${v.modelYear})`}
                                secondary={`VIN: ${v.vinChassisNumber} | Serial: ${v.serialNumber}`}
                              />
                            </ListItemButton>
                          ))}
                        </>
                      )}
                      
                      {results.vendors.length > 0 && (
                        <>
                          <ListSubheader sx={{ bgcolor: 'background.neutral' }}>Vendors</ListSubheader>
                          {results.vendors.map(v => (
                            <ListItemButton key={v.id} onClick={() => { navigate('/settings'); handleClose(); }}>
                              <ListItemText primary={v.name || v.id} />
                            </ListItemButton>
                          ))}
                        </>
                      )}

                      {results.parking.length > 0 && (
                        <>
                          <ListSubheader sx={{ bgcolor: 'background.neutral' }}>Parking</ListSubheader>
                          {results.parking.map(p => (
                            <ListItemButton key={p.id} onClick={() => { navigate('/settings'); handleClose(); }}>
                              <ListItemText primary={p.parkingLocation || p.id} />
                            </ListItemButton>
                          ))}
                        </>
                      )}

                      {results.portals.length > 0 && (
                        <>
                          <ListSubheader sx={{ bgcolor: 'background.neutral' }}>Bank Portals</ListSubheader>
                          {results.portals.map(p => (
                            <ListItemButton key={p.id} onClick={() => { navigate('/settings'); handleClose(); }}>
                              <ListItemText primary={p.bankPortalName || p.id} />
                            </ListItemButton>
                          ))}
                        </>
                      )}
                    </List>
                  ) : (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">No results found</Typography>
                    </Box>
                  )}
                </Paper>
              </Box>
            )}
          </Box>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
