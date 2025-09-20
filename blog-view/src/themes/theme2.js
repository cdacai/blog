// 方案2：雅致风格
export const theme2 = {
    name: '雅致',
    colors: {
        primary: '#e86c8d',
        background: '#fdf2f3',
        text: {
            primary: '#2c3e50',
            secondary: '#64748b',
            meta: '#94a3b8'
        },
        nav: {
            inactive: 'rgba(156, 163, 175, 0.75)',
            hover: 'rgba(156, 163, 175, 1)'
        },
        card: {
            background: '#ffffff'
        },
        divider: 'rgba(0, 0, 0, 0.05)',
        states: {
            hover: {
                primary: 'rgba(255, 64, 129, 0.9)',
                text: 'rgba(17, 24, 39, 0.9)',
                background: 'rgba(0, 0, 0, 0.02)'
            },
            active: {
                primary: 'rgba(255, 64, 129, 1)',
                text: 'rgba(17, 24, 39, 1)',
                background: 'rgba(0, 0, 0, 0.05)'
            },
            disabled: {
                primary: 'rgba(255, 64, 129, 0.4)',
                text: 'rgba(17, 24, 39, 0.4)',
                background: 'rgba(0, 0, 0, 0.1)'
            }
        },
        social: {
            github: '#24292e',
            twitter: '#1da1f2',
            facebook: '#1877f2',
            linkedin: '#0a66c2'
        },
        gradients: {
            primary: 'linear-gradient(45deg, var(--theme-primary) 0%, var(--theme-primary-light) 100%)',
            background: 'linear-gradient(180deg, var(--theme-bg) 0%, var(--theme-bg-secondary) 100%)'
        },
        variants: {
            primaryLight: 'rgba(var(--theme-primary-rgb), 0.1)',
            primaryDark: 'rgba(var(--theme-primary-rgb), 0.9)',
            textLight: 'rgba(var(--theme-text-primary-rgb), 0.1)',
            textDark: 'rgba(var(--theme-text-primary-rgb), 0.9)'
        },
        semantic: {
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        }
    },
    spacing: {
        headerHeight: '48px',
        headerTop: '32px',
        headerPadding: '0 36px',
        contentWidth: '1120px',
        contentPadding: '36px',
        mainPaddingTop: '100px',
        sidebarWidth: '280px',
        sidebarSpacing: '36px',
        gap: {
            grid: '100px',
            articles: '32px',
            nav: '56px',
            meta: '20px',
            social: '20px'
        },
        padding: {
            card: '36px 40px',
            sidebar: '36px',
            content: '32px',
            nav: '14px 24px',
            meta: '8px 16px'
        },
        margin: {
            sectionTitle: '36px',
            articleTitle: '14px',
            articleMeta: '12px',
            articleDesc: '16px',
            sidebarSection: '36px',
            categoryItem: '10px'
        },
        sections: {
            aboutMarginBottom: '36px',
            categoriesMarginTop: '36px',
            articleFooterSpacing: '24px'
        },
        divider: {
            margin: '36px 0',
            opacity: '0.05'
        },
        base: {
            unit: '4px',
            scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 100]
        },
        container: {
            maxWidth: '1200px',
            padding: {
                desktop: '32px',
                tablet: '24px',
                mobile: '16px'
            }
        },
        article: {
            spacing: {
                between: '32px',
                meta: '12px',
                title: '16px',
                description: '16px',
                footer: '20px'
            },
            padding: {
                desktop: '32px 40px',
                tablet: '24px 32px',
                mobile: '20px 24px'
            }
        },
        sidebar: {
            spacing: {
                section: '32px',
                item: '8px',
                title: '16px'
            }
        },
        presets: {
            compact: {
                card: '16px',
                container: '16px',
                section: '24px'
            },
            normal: {
                card: '24px',
                container: '32px',
                section: '48px'
            },
            relaxed: {
                card: '32px',
                container: '48px',
                section: '64px'
            }
        }
    },
    typography: {
        logo: {
            size: '24px',
            weight: 'bold'
        },
        nav: {
            size: '13px',
            spacing: '0.03em'
        },
        title: {
            size: '22px',
            lineHeight: '1.5',
            weight: 'normal',
            spacing: '-0.02em'
        },
        sectionTitle: {
            size: '20px',
            weight: '400',
            spacing: '-0.02em'
        },
        meta: {
            size: '12px',
            spacing: '0.03em'
        },
        description: {
            size: '14px',
            lineHeight: '1.7',
            spacing: '0.01em'
        },
        footer: {
            size: '13px',
            spacing: '0.02em'
        },
        sidebar: {
            title: {
                size: '1.1rem',
                weight: '600',
                spacing: '0.01em'
            },
            text: {
                size: '1rem',
                lineHeight: '1.8',
                spacing: '0.01em'
            },
            category: {
                size: '1rem',
                spacing: '0.01em'
            },
            count: {
                size: '0.9rem',
                lineHeight: '1.5'
            }
        },
        link: {
            size: '14px',
            weight: 'normal',
            decoration: 'none'
        },
        article: {
            title: {
                size: '24px',
                lineHeight: '1.4',
                weight: 'normal',
                spacing: '-0.02em',
                decoration: 'none'
            },
            meta: {
                size: '12px',
                spacing: '0.05em',
                weight: 'normal'
            },
            description: {
                size: '14px',
                lineHeight: '1.6',
                spacing: '0.01em'
            }
        },
        base: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            size: '14px',
            lineHeight: '1.5',
            weight: 'normal'
        }
    },
    borderRadius: {
        card: '16px',
        button: '4px',
        tag: '12px',
        input: '6px',
        image: '8px'
    },
    shadows: {
        card: '0 1px 3px rgba(0, 0, 0, 0.05)',
        hover: '0 4px 12px rgba(0, 0, 0, 0.08)',
        dropdown: '0 2px 8px rgba(0, 0, 0, 0.12)',
        button: '0 1px 2px rgba(0, 0, 0, 0.05)'
    },
    transitions: {
        hover: 'all 0.2s ease',
        dropdown: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fade: 'opacity 0.2s ease',
        transform: {
            hover: 'translateY(-2px)'
        }
    },
    opacity: {
        hover: '1',
        inactive: '0.75',
        active: '1'
    },
    layout: {
        header: {
            position: 'fixed',
            background: 'transparent'
        },
        main: {
            minHeight: '100vh'
        },
        sidebar: {
            position: 'sticky',
            top: '32px'
        },
        breakpoints: {
            mobile: '480px',
            tablet: '768px',
            desktop: '1024px',
            wide: '1280px'
        },
        grid: {
            columns: 12,
            gap: {
                desktop: '32px',
                tablet: '24px',
                mobile: '16px'
            }
        },
        container: {
            maxWidth: {
                desktop: '1200px',
                tablet: '100%',
                mobile: '100%'
            }
        }
    },
    display: {
        header: 'flex',
        nav: 'flex',
        content: 'grid',
        footer: 'flex'
    },
    grid: {
        template: 'minmax(0, 1fr) var(--theme-sidebar-width)',
        gap: 'var(--theme-grid-gap)',
        layouts: {
            blog: {
                main: 'minmax(0, 1fr)',
                sidebar: 'var(--theme-sidebar-width)'
            },
            article: {
                content: 'minmax(0, 1fr)',
                toc: '240px'
            }
        }
    },
    align: {
        header: 'center',
        nav: 'center',
        content: 'start',
        footer: 'center'
    },
    justify: {
        header: 'space-between',
        nav: 'flex-end',
        content: 'space-between',
        footer: 'space-between'
    },
    list: {
        style: 'none',
        padding: '0',
        margin: '0'
    },
    animations: {
        duration: {
            fast: '0.15s',
            normal: '0.25s',
            slow: '0.35s'
        },
        timing: {
            default: 'ease',
            smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
            spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        },
        hover: {
            scale: '1.02',
            translateY: '-2px',
            shadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }
    },
    responsive: {
        mobile: {
            fontSize: '14px',
            spacing: {
                unit: '4px',
                container: '16px',
                grid: '16px'
            }
        },
        tablet: {
            fontSize: '15px',
            spacing: {
                unit: '4px',
                container: '24px',
                grid: '24px'
            }
        },
        desktop: {
            fontSize: '16px',
            spacing: {
                unit: '4px',
                container: '32px',
                grid: '32px'
            }
        }
    },
    effects: {
        hover: {
            transform: {
                subtle: 'translateY(-2px)',
                medium: 'translateY(-4px)',
                large: 'translateY(-6px)'
            },
            shadow: {
                subtle: '0 4px 16px rgba(0,0,0,0.06)',
                medium: '0 8px 24px rgba(0,0,0,0.08)',
                large: '0 12px 32px rgba(0,0,0,0.1)'
            },
            scale: {
                subtle: 'scale(1.03)',
                medium: 'scale(1.05)',
                large: 'scale(1.07)'
            },
            glow: {
                subtle: '0 0 25px rgba(167,139,250,0.3)',
                medium: '0 0 35px rgba(167,139,250,0.4)',
                large: '0 0 45px rgba(167,139,250,0.5)'
            }
        },
        focus: {
            ring: {
                width: '4px',
                color: 'rgba(167, 139, 250, 0.35)',
                offset: '2px'
            }
        }
    },
    motion: {
        duration: {
            instant: '0.1s',
            fast: '0.3s',
            normal: '0.4s',
            slow: '0.6s',
            slower: '0.8s'
        },
        easing: {
            linear: 'linear',
            ease: 'ease',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            spring: 'cubic-bezier(0.155, 1.105, 0.295, 1.12)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    },
    components: {
        card: {
            variants: {
                elevated: {
                    background: 'var(--theme-variants-glass)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--theme-card-border)',
                    shadow: 'var(--theme-shadow-card)',
                    hover: {
                        transform: 'translateY(-6px)',
                        shadow: 'var(--theme-shadow-hover)',
                        glow: 'var(--theme-card-glow)'
                    }
                },
                outlined: {
                    background: 'transparent',
                    border: '1px solid var(--theme-card-border)',
                    hover: {
                        borderImage: 'var(--theme-gradients-border) 1',
                        transform: 'translateY(-4px)'
                    }
                },
                gradient: {
                    background: 'var(--theme-gradients-card)',
                    backdropFilter: 'blur(20px)',
                    hover: {
                        transform: 'translateY(-6px)',
                        shadow: 'var(--theme-shadow-hover)',
                        glow: 'var(--theme-card-glow)'
                    }
                }
            }
        },
        button: {
            variants: {
                solid: {
                    background: 'var(--theme-gradients-primary)',
                    color: '#ffffff',
                    shadow: 'var(--theme-shadow-button)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    hover: {
                        transform: 'translateY(-3px)',
                        shadow: '0 8px 16px rgba(167, 139, 250, 0.4)',
                        glow: '0 0 20px rgba(167, 139, 250, 0.3)'
                    }
                },
                outline: {
                    background: 'transparent',
                    border: '2px solid var(--theme-primary)',
                    color: 'var(--theme-primary)',
                    hover: {
                        background: 'var(--theme-variants-primaryLight)',
                        transform: 'translateY(-3px)'
                    }
                },
                ghost: {
                    background: 'transparent',
                    color: 'var(--theme-primary)',
                    hover: {
                        background: 'var(--theme-variants-primaryLight)',
                        transform: 'translateY(-3px)'
                    }
                },
                glass: {
                    background: 'var(--theme-variants-glass)',
                    backdropFilter: 'blur(20px)',
                    color: 'var(--theme-text-primary)',
                    border: '1px solid var(--theme-card-border)',
                    hover: {
                        transform: 'translateY(-3px)',
                        shadow: 'var(--theme-shadow-hover)'
                    }
                }
            },
            sizes: {
                small: {
                    padding: '10px 20px',
                    fontSize: '15px',
                    height: '40px',
                    borderRadius: '12px'
                },
                medium: {
                    padding: '14px 24px',
                    fontSize: '16px',
                    height: '48px',
                    borderRadius: '14px'
                },
                large: {
                    padding: '16px 32px',
                    fontSize: '17px',
                    height: '56px',
                    borderRadius: '16px'
                }
            }
        }
    }
}
